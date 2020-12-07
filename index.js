var box, personName, generate;
  box = document.querySelector('.con');
  personName = document.getElementById('personName');
  generate = document.getElementById('generate');

var pro, love, user;
  pro = document.querySelector('.probody');
  love = document.querySelector('.love');
  user = document.querySelector('.user');

var url, index, getName;
  url = window.location.href
  index = url.indexOf("#")
  getName = url.slice(index+1)
  
  
//EventListener
generate.addEventListener('click', getLink );

function boxShow() {
  if (index == -1 || index == 0 || getName.length == 0) {
    box.style.display = "flex";
    pro.style.display = "none";
    
  }else{
    box.style.display = "none";
    pro.style.display = "block";
    
  }
  user.innerText = getName;
}

function getLink() {
  if (!generate.classList.contains('copy') ) {
    if (personName.value.length == 0) {
      alert('please Enter A Valid Name ')
    } else {
      var link = personName.value;
      if (url.slice(-1) == "#") {
        link = url + link;
      }else{
        link = url + "#" + link;
      }           
      personName.value = link;
      generate.value = "copy";
      generate.classList.add('copy');
    }
  } else {
    personName.select();
    personName.setSelectionRange(0,999);
    document.execCommand("copy");
    
    alert("Link Was Copied Now Share This To Your Crush ♥")
  }
}

  var slider = document.querySelector('.slider');
  var nxtbtn = document.querySelector('.nxtbtn');
  var y = slider.children.length;
      y = parseInt(y);
      slider.style.height = 100*y + "vh";
  var indexblk = 0;
  
function nxt() {
  indexblk++
  if (indexblk < y) {
    slider.style.transform = "translateY("+ (indexblk) * (-100) +"vh)"
    if (indexblk == (y-1)) {
      console.log("last block");
      nxtbtn.style.transform = "rotate(270deg)"
    }
  }else{
      indexblk = 0;
      slider.style.transform = "translateY("+ (indexblk) * (-100) +"vh)"
      nxtbtn.style.transform = "rotate(90deg)"
    }
}

console.log(url);
console.log(index);
console.log(getName);