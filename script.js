
//Abaixo, roda para cada entrada do drag&drop
document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
  const dropZoneElement = inputElement.closest(".drop-zone");
  button = dropZoneElement.querySelector("button"),

	button.onclick = ()=>{
	inputElement.click();
	}

	//Abaixo, roda caso o usuário tenha feito uso do botão 'Procurar Arquivo'
  inputElement.addEventListener("change", (e) => {
    //Se realmente foi arrastado pelo menos 1 arquivo
	if (inputElement.files.length) {
      //updateThumbnail(dropZoneElement, inputElement.files[0]);
	  
	  //Verificar se o tamanho dos arquivos não ultrapassam um limite
	  //Se size=0, então o usuário fez upload de uma pasta.
	  //O size para pastas é 0 mesmo se a pasta conter algo
		//Portanto, ignorar os casos de size=0
	  
	  
	  
	  console.log(inputElement.files)
    }
  });

	//Se tem algum arquivo sendo arrastado que está sobre a área
  dropZoneElement.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZoneElement.classList.add("drop-zone--over");
	//dropZoneElement.getElementById("drop-zone-icon").style.display = "block";
	//dropZoneElement.getElementById("button_procurar").style.display = "none";
	
  });

	//Se saiu de cima da área
  ["dragleave", "dragend"].forEach((type) => {
    dropZoneElement.addEventListener(type, (e) => {
      dropZoneElement.classList.remove("drop-zone--over");
	  //dropZoneElement.getElementById("drop-zone-icon").style.display = "none";
	  //dropZoneElement.getElementById("button_procurar").style.display = "block";
    });
  });

	//Quando o arquivo é solto dentro da área
  dropZoneElement.addEventListener("drop", (e) => {
    e.preventDefault();

	//Se realmente foi arrastado pelo menos 1 arquivo
    if (e.dataTransfer.files.length) {
      inputElement.files = e.dataTransfer.files;
      //updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
	  
	  //Verificar se o tamanho dos arquivos não ultrapassam um limite
	  //Se size=0, então o usuário fez upload de uma pasta.
	  //O size para pastas é 0 mesmo se a pasta conter algo
		//Portanto, ignorar os casos de size=0
	  
	  
	  console.log(e.dataTransfer.files);
	  
	  //Aqui, criar um novo elemento na lista de arquivos
	  //Lá, inserir um elemento com o nome do arquivo e um X para remove-lo
    }

	//Apos dropar o arquivo, retornar o drop-zone a sua aparencia normal
    dropZoneElement.classList.remove("drop-zone--over");
	//dropZoneElement.getElementById("drop-zone-icon").style.display = "none";
	//dropZoneElement.getElementById("button_procurar").style.display = "block";
  });
});

/**
 * Updates the thumbnail on a drop zone element.
 *
 * @param {HTMLElement} dropZoneElement
 * @param {File} file
 */
function updateThumbnail(dropZoneElement, file) {
  let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

  // First time - remove the prompt
  if (dropZoneElement.querySelector(".drop-zone__prompt")) {
    dropZoneElement.querySelector(".drop-zone__prompt").remove();
  }

  // First time - there is no thumbnail element, so lets create it
  if (!thumbnailElement) {
    thumbnailElement = document.createElement("div");
    thumbnailElement.classList.add("drop-zone__thumb");
    dropZoneElement.appendChild(thumbnailElement);
  }

  thumbnailElement.dataset.label = file.name;

  // Show thumbnail for image files
  if (file.type.startsWith("image/")) {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
    };
  } else {
    thumbnailElement.style.backgroundImage = null;
  }
}

/* Aqui, implementar minhas funções */