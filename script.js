const loadSynonyms = (arr) => {
  const htmlElements = arr.map((element) => `<span class = "btn">${element}</span>`)

  return htmlElements.join(" ");
}

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}


const manageLoading = (status) => {
  if(status == true){
    document.getElementById("loading").classList.remove("hidden");
    document.getElementById("load-level").classList.add("hidden");
  }else{
    document.getElementById("load-level").classList.remove("hidden");
    document.getElementById("loading").classList.add("hidden");

  }

}

const loadLesson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
  .then((response) => response.json())
  .then((data) => displayData(data.data));
}

const loadLevel = (id) => {
  manageLoading(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`

  fetch(url)
  .then((response) => response.json())
  .then((data) =>{
    removeActive()
    const clickBtn = document.getElementById(`lesson-btn-${id}`)
    clickBtn.classList.add("active");
    displayLevelData(data.data);
  })
}


const removeActive = () => {
  const lessonBtn = document.querySelectorAll(".lesson-btn")
  lessonBtn.forEach(btn => {btn.classList.remove("active")});
  }


const loadWordDetails = async(id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`

  const response = await fetch(url)

  const details = await response.json()

  displayDetails(details.data);

}

const displayDetails = (word) => {
  const detailsBox = document.getElementById("details");
  detailsBox.innerHTML = `
      <div id="detail" class="space-y-3">
      <h1 class="text-2xl font-bold ">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h1>
      <h2 class="font-semibold">Meaning</h2>
      <h3 class="font-bangla">${word.meaning}</h3>
      <h4 class="font-semibold">Example</h4>
      <p>${word.sentence}</p>
      <p class="font bangla font-semibold">সমার্থক শব্দ গুলো</p>
      <div class="flex flex-wrap gap-3">
      ${loadSynonyms(word.synonyms)}
     </div>
    </div>
  `;
  document.getElementById("my_modal_5").showModal();
}


const displayLevelData = (words) => {
  const loadLevel = document.getElementById("load-level");
  loadLevel.innerHTML = "";

  if( words.length == 0){
    loadLevel.innerHTML = `
    <div class="font-bangla text-center col-span-full space-y-2">
      <img src="./assets/alert-error.png" alt="" class = "mx-auto">
      <p class="text-[16px] font-semibold text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
      <h1 class="text-4xl font-bold">নেক্সট Lesson এ যান</h1>
    </div>
    `
    manageLoading(false);
    return;
  }

  words.forEach(word => {
    const card = document.createElement("div");

    card.innerHTML = `
    <div class="bg-white rounded-md py-10 px-5 text-center space-y-3">
        <h1 class="text-2xl font-bold">${word.word? word.word : "কোনো ওয়ার্ড পাওয়া যায় নি।"}</h1>
        <p class="text-xl font-medium">Meaning /Pronunciation</p>
        <h2 class="font-bangla text-xl font-medium">"${word.meaning? word.meaning : "কোনো মিনিং পাওয়া যায় নি। "} / ${word.pronunciation? word.pronunciation : "কোনো pronunciation পাওয়া যায় নি।"}"</h2>

        <div class="flex justify-between">
          <button onclick = "loadWordDetails(${word.id})" class="btn"><i class="fa-solid fa-circle-info"></i></button>
          <button onclick = "pronounceWord('${word.word}')" class="btn"><i class="fa-solid fa-volume-high"></i></button>
        </div>
      </div>
    
    `
    loadLevel.appendChild(card);
    
  });
  manageLoading(false);
}


const displayData = (lessons) => {
  const level = document.getElementById("level");
  level.innerHTML = "";
   
for( let lesson of lessons) {
   const btnDiv = document.createElement("div");
   btnDiv.innerHTML = `
   <button id = "lesson-btn-${lesson.level_no}" onclick = "loadLevel(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i> lesson- ${lesson.level_no}</button>
   `;
   level.appendChild(btnDiv);
}

}

loadLesson();

