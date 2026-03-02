const loadLesson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
  .then((response) => response.json())
  .then((data) => displayData(data.data));
}
const displayData = (lessons) => {
  const level = document.getElementById("level");
  level.innerHTML = "";
   
for( let lesson of lessons) {
   const btnDiv = document.createElement("div");
   btnDiv.innerHTML = `
   <button class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> lesson- ${lesson.level_no}</button>
   `;
   level.appendChild(btnDiv);
}

}
loadLesson();

