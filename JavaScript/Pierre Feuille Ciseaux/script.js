const gameContainer = document.querySelector(".container"),
userResult = document.querySelector(".user_result img"),
cpuResult = document.querySelector(".cpu_result img"),
result = document.querySelector(".result"),
optionImages = document.querySelectorAll(".option_image");

optionImages.forEach((image,index) => {
    image.addEventListener("click", (e) => {
      image.classList.add("active");
      
      userResult.src = cpuResult.src = "images/pierre.png"
      result.textContent = "Suspense...";

      optionImages.forEach((image2,index2) => {
        //console.log(index,index2);
        index !== index2 && image2.classList.remove("active");
      });

      gameContainer.classList.add("start");
      
      let time = setTimeout(() => {
        gameContainer.classList.remove("start")
        let imageSrc = e.target.querySelector("img").src;
      userResult.src = imageSrc
      //console.log(imageSrc);
      let randomNumber = Math.floor(Math.random() * 3);
      //console.log(randomNumber);
      let cpuImages = ["images/pierre.png", "images/feuille.png", "images/ciseaux.png"];
      cpuResult.src = cpuImages[randomNumber];
      let cpuValue = ["P", "F", "C"][randomNumber];
      let userValue = ["P", "F", "C"][index]

      let outcomes = {
        PP: "Draw",
        PF: "L'IA",
        PC: "Le joueur",
        FF: "Draw",
        FP: "Le joueur",
        FC: "L'IA",
        CC: "Draw",
        CP: "L'IA",
        CF: "Le joueur",
      };

      let outComeValue = outcomes[userValue + cpuValue];

      result.textContent = userValue === cpuValue ? "Égalité !" : `${outComeValue} gagne !`;

      },1300)
    });
});
//console.log(gameContainer,userResult,cpuResult,result,optionImages)