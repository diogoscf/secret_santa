var participant_lang = "Participant"
var name_placeholder = "Name"

class ParticipantsForm {
  constructor(num) {
    this.col = num % 3;
    this.shows = num + 1;
    this.participant = participant_lang;
    this.placeholder = name_placeholder
  };
  createNew() {
    document.getElementById('participants').style.display = "block"
    document.getElementsByClassName('column')[this.col].innerHTML +=
      '<div class="guy">' +
      '<p>' + this.participant +  '&nbsp;' + this.shows + '</p>' +
      '<input type="text" class="width" name="name" placeholder="' + this.placeholder + '">' +
      '</div>';
  };
}

class Table {
  constructor(name, partner) {
    this.name = name;
    this.partner = partner;
  }
  createNew() {
    document.getElementsByTagName('table')[0].style.display = "table"
    document.getElementById('partstable').innerHTML +=
      '<tr>' +
      '<td class="tname" width="50%">' + this.name + '</td>' +
      '<td class="tpartner" width="50%">' + this.partner + '</td>' +
      '</tr>';
  }
}

function confirmAmount() {
  var amount = parseInt(document.getElementById('number').value, 10)
  if (amount <= 1 || isNaN(amount)) {
    document.getElementsByClassName('badform')[0].style.display = "block";
    return;
  }
  var cols = document.getElementsByClassName('column');
  for (var i = 0; i < cols.length; i++) {
    cols[i].innerHTML = ""
  }
  for (var i = 0; i < amount; i++) {
    new ParticipantsForm(i).createNew();
  }
  document.getElementById('participants').style.display = 'block';
  var error = document.getElementsByClassName("badform")
  for (var i = 0; i < error.length; i++) {
    error[i].style.display = "none";
  }
};

function createRandomArray(numElements) {
  var nums = [];
  for (var j = 0; j < numElements; j++) {
    nums.push(j)
  }
  var original = [...nums];
  for (var i = 0; i < 1;) {
    nums = shuffle(nums)
    var flag = nums.some(function(el, k) {
      return el == original[k];
    })
    if (flag) continue;
    i++;
  }
  return nums;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}


function getPartner(num, partnerNum) {
  var giverName = document.getElementsByClassName('guy')[num].getElementsByTagName('input')[0].value;
  var receiverName = document.getElementsByClassName('guy')[partnerNum].getElementsByTagName('input')[0].value;
  new Table(giverName, receiverName).createNew();
}

function checkEntries() {
  var people = document.getElementsByClassName('guy');
  for (var i = 0; i < people.length; i++) {
    var tempName = people[i].getElementsByTagName('input')[0].value;
    if (!tempName.length) {
      return false;
    }
  }
  return true;
}

function giveFriend() {
  if (!checkEntries()) {
    document.getElementsByClassName("badform")[1].style.display = "block";
  } else {
    document.getElementsByClassName("badform")[1].style.display = "none";
    var num = document.getElementsByClassName('guy').length;
    var randomArray = createRandomArray(num);
    document.getElementById('partstable').innerHTML = "";
    for (var i = 0; i < randomArray.length; i++) {
      getPartner(i, randomArray[i]);
    }
  }
}
