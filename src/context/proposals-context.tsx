"use client";

import { db } from "@/lib/firebase";
import { MAX_PAGES_PER_USER } from "@/lib/limits";
import type {
  FeedbackAnswer,
  FeedbackEntry,
  ProposalPage,
} from "@/types/proposal";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { createContext, useContext, type ReactNode } from "react";

type CreatePageInput = Omit<ProposalPage, "id" | "createdAt" | "updatedAt">;
type UpdatePageInput = Partial<
  Omit<ProposalPage, "id" | "ownerUid" | "createdAt" | "updatedAt">
>;

type ProposalsContextValue = {
  listMyPages: (uid: string) => Promise<ProposalPage[]>;
  getPage: (pageId: string) => Promise<ProposalPage | null>;
  createPage: (input: CreatePageInput) => Promise<string>;
  updatePage: (pageId: string, input: UpdatePageInput) => Promise<void>;
  deletePage: (pageId: string, ownerUid: string) => Promise<void>;
  submitFeedback: (pageId: string, answer: FeedbackAnswer) => Promise<void>;
  listFeedback: (pageId: string) => Promise<FeedbackEntry[]>;
};

const ProposalsContext = createContext<ProposalsContextValue | null>(null);

const requireDb = () => {
  if (!db)
    throw new Error(
      "Firebase is not configured. Set NEXT_PUBLIC_FIREBASE_* env vars.",
    );
  return db;
};

export const ProposalsProvider = ({ children }: { children: ReactNode }) => {
  const listMyPages = async (uid: string): Promise<ProposalPage[]> => {
    const q = query(
      collection(requireDb(), "pages"),
      where("ownerUid", "==", uid),
      orderBy("createdAt", "desc"),
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(
      (d) => ({ id: d.id, ...d.data() }) as ProposalPage,
    );
  };

  const getPage = async (pageId: string): Promise<ProposalPage | null> => {
    const snapshot = await getDoc(doc(requireDb(), "pages", pageId));
    if (!snapshot.exists()) return null;
    return { id: snapshot.id, ...snapshot.data() } as ProposalPage;
  };

  // atomically checks + increments the owner's page count so the 5-page cap can't be raced
  const createPage = async (input: CreatePageInput): Promise<string> => {
    const database = requireDb();
    const pageRef = doc(collection(database, "pages"));
    const userRef = doc(database, "users", input.ownerUid);

    await runTransaction(database, async (transaction) => {
      const userSnap = await transaction.get(userRef);
      const pageCount = userSnap.exists()
        ? (userSnap.data().pageCount ?? 0)
        : 0;

      if (pageCount >= MAX_PAGES_PER_USER) {
        throw new Error(
          `You can only create up to ${MAX_PAGES_PER_USER} pages.`,
        );
      }

      transaction.set(pageRef, {
        ...input,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      transaction.set(userRef, { pageCount: pageCount + 1 }, { merge: true });
    });

    return pageRef.id;
  };

  const updatePage = async (
    pageId: string,
    input: UpdatePageInput,
  ): Promise<void> => {
    await updateDoc(doc(requireDb(), "pages", pageId), {
      ...input,
      updatedAt: serverTimestamp(),
    });
  };

  const deletePage = async (
    pageId: string,
    ownerUid: string,
  ): Promise<void> => {
    const database = requireDb();
    const userRef = doc(database, "users", ownerUid);

    await runTransaction(database, async (transaction) => {
      const userSnap = await transaction.get(userRef);
      const pageCount = userSnap.exists()
        ? (userSnap.data().pageCount ?? 0)
        : 0;

      transaction.delete(doc(database, "pages", pageId));
      transaction.set(
        userRef,
        { pageCount: Math.max(0, pageCount - 1) },
        { merge: true },
      );
    });
  };

  const submitFeedback = async (
    pageId: string,
    answer: FeedbackAnswer,
  ): Promise<void> => {
    await addDoc(collection(requireDb(), "pages", pageId, "feedback"), {
      answer,
      createdAt: serverTimestamp(),
    });
  };

  const listFeedback = async (pageId: string): Promise<FeedbackEntry[]> => {
    const snapshot = await getDocs(
      collection(requireDb(), "pages", pageId, "feedback"),
    );
    return snapshot.docs.map(
      (d) => ({ id: d.id, ...d.data() }) as FeedbackEntry,
    );
  };

  return (
    <ProposalsContext.Provider
      value={{
        listMyPages,
        getPage,
        createPage,
        updatePage,
        deletePage,
        submitFeedback,
        listFeedback,
      }}
    >
      {children}
    </ProposalsContext.Provider>
  );
};

export const useProposals = () => {
  const ctx = useContext(ProposalsContext);
  if (!ctx)
    throw new Error("useProposals must be used within a ProposalsProvider");
  return ctx;
};
