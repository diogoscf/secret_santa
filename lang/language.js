var lang = "en"

const langs = {
  short_langs: ['en', 'pt', 'fr'],
  long_langs: {
    en: 'English',
    pt: 'Português',
    fr: 'Français'
  },
  requestURL: {
    en: './lang/en.json',
    pt: './lang/pt.json',
    fr: './lang/fr.json'
  }
}

function changeLanguage(language, first) {
  lang = language;
  var request = new XMLHttpRequest();
  request.open('GET', langs.requestURL[lang])
  request.responseType = 'json';
  request.send();
  request.onload = function() {
    var lang_data = request.response;
    changeText(lang_data, first);
    orderDropdown(lang);
  }
}

function changeText(data, first) {
  document.getElementById("big-title").innerHTML = data["big-title"]
  document.getElementById("how-many").innerHTML = data["how-many"]
  document.getElementById("number").placeholder = data["number"]
  document.getElementById("confirm-amount").innerHTML = data["confirm-amount"]
  document.getElementById("bad-amount").innerHTML = data["bad-amount"]
  document.getElementById("insert-names").innerHTML = data["insert-names"]
  participant_lang = data["participant"]
  name_placeholder = data["name-placeholder"]
  document.getElementById("bad-names").innerHTML = data["bad-names"]
  document.getElementById("pick-santas").innerHTML = data["pick-santas"]
  document.getElementById("giver").innerHTML = data["giver"]
  document.getElementById("receiver").innerHTML = data["receiver"]
  if(!first) {
    confirmAmount()
  }
}

class DropdownLang {
  constructor(lang, first) {
    this.short = lang
    this.long = langs.long_langs[lang]
    this.firstXtra = first ? '&nbsp;<i class="fas fa-caret-down"></i>' : ''
  }
  createNew() {
    document.getElementsByTagName('ul')[0].innerHTML +=
    '<a href="#" onclick="changeLanguage(&quot;' + this.short + '&quot;)">' +
    '<li><img src="./lang/' + this.short + '_flag.png"/>' + this.long + this.firstXtra +
    '</li></a>'
  }
}

function orderDropdown(lang) {
  document.getElementsByTagName('ul')[0].innerHTML = ""
  var languages = [...langs.short_langs]
  new DropdownLang(lang, true).createNew()
  languages.splice(languages.indexOf(lang), 1)
  languages.forEach(function(el){
    new DropdownLang(el, false).createNew()
  })
}

document.addEventListener('DOMContentLoaded', function() {
  var locale = navigator.language.substring(0, 2)
  var displayLang = langs.short_langs.includes(locale) ? locale : 'en'
  changeLanguage(displayLang, true)
}, false);
