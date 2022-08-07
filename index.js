let formBlocks = document.getElementById("forms");
let appendBtn = document.getElementById("append");
let submitBtn = document.getElementById("overAllSubmit");
let formIndex = 0;
let globalValues = [];
const formRemover = ({ node, id }) => {
  if (node.parentNode) {
    node.parentNode.removeChild(node);
    if (globalValues?.length) {
      globalValues = globalValues.filter((e) => {
        return e.id !== id;
      });
    }
  }
};

const attributesSetter = ({
  elem,
  type,
  classNames,
  name,
  placeHolder,
  id,
}) => {
  if (elem) {
    if (classNames) {
      elem.setAttribute("class", `${classNames}`);
    }
    if (type) {
      elem.setAttribute("type", `${type}`);
    }
    if (name) {
      elem.setAttribute("name", `${name}`);
    }
    if (placeHolder) {
      elem.setAttribute("placeholder", `${placeHolder}`);
    }
    if (id) {
      elem.setAttribute("id", `${id}`);
    }
  }
};
const toggleAddButton = (disabled) => {
  if (disabled) {
    appendBtn.disabled = true;
    appendBtn.style.pointerEvents = "none";
    submitBtn.disabled = true;
    submitBtn.style.pointerEvents = "none";
  } else {
    appendBtn.disabled = false;
    appendBtn.style.pointerEvents = "auto";
    submitBtn.disabled = false;
    submitBtn.style.pointerEvents = "auto";
  }
};
const hasAlreadyValue = ({ value, name, id }) => {
  let matchingId = "form" + id;
  if (globalValues?.length > 0 && value?.length > 0) {
    let hasValue = globalValues.filter((e) => {
      return e[name] === value && matchingId !== e.id;
    });

    if (hasValue?.length) {
      return true;
    } else {
      singleValueSpreader({ id: id, name: name, value: value });
      return false;
    }
  } else {
    return false;
  }
};

const errorHandler = ({ errorPara, text, id }) => {
  let formInputs = document
    .querySelector(`#form${id}`)
    .getElementsByTagName("input");
  let inputsValues = [];
  for (let i = 0; i < formInputs?.length; i++) {
    inputsValues.push(formInputs[i].value);
  }
  errorPara.innerHTML = text;
  if (text) {
    toggleAddButton(true);
    return false;
  } else {
    if (inputsValues?.every((e) => e?.length > 0)) {
      toggleAddButton(false);
      return true;
    } else {
      toggleAddButton(true);
      return false;
    }
  }
};

const singleValueSpreader = ({ id, name, value }) => {
  globalValues = globalValues.map((e) => {
    if (e.id === `form${id}`) {
      return {
        ...e,
        [name]: value,
      };
    } else {
      return { ...e };
    }
  });
};

const validator = ({ value, name, errorPara }) => {
  let nameArray = name && name.split("");
  let id = name && name[nameArray.length - 1];
  name = name && nameArray.slice(0, nameArray.length - 1).join("");
  let hasBefore = name && hasAlreadyValue({ value: value, name: name, id: id });
  switch (name) {
    case "name":
      if (!value?.length) {
        errorHandler({
          errorPara: errorPara,
          text: "*Required",
          id: id,
        });
      } else if (value?.length) {
        if (hasBefore) {
          errorHandler({
            errorPara: errorPara,
            text: "Sorry this entry has already been taken!",
            id: id,
          });
        } else {
          errorHandler({
            errorPara: errorPara,
            text: "",
            id: id,
          });
        }
      }
      break;
    case "userName":
      if (!value?.length) {
        errorHandler({
          errorPara: errorPara,
          text: "*Required",
          id: id,
        });
      } else if (value?.length) {
        if (hasBefore) {
          errorHandler({
            errorPara: errorPara,
            text: "Sorry this entry has already been taken!",
            id: id,
          });
        } else {
          errorHandler({
            errorPara: errorPara,
            text: "",
            id: id,
          });
        }
      }
      break;
    case "age":
      if (!value?.length) {
        errorHandler({
          errorPara: errorPara,
          text: "*Required",
          id: id,
        });
      } else if (value?.length) {
        if (hasBefore) {
          errorHandler({
            errorPara: errorPara,
            text: "Sorry this entry has already been taken!",
            id: id,
          });
        } else {
          errorHandler({
            errorPara: errorPara,
            text: "",
            id: id,
          });
        }
      }
      break;
    default:
      let lastFormInputs = document
        .getElementById("forms")
        .lastChild.getElementsByTagName("input");
      let hasError = false;
      for (let i = 0; i < lastFormInputs?.length; i++) {
        if (!lastFormInputs[i].value) {
          lastFormInputs[i].nextElementSibling.innerHTML = "*Required";
          hasError = true;
        }
      }
      if (hasError) {
        toggleAddButton(true);
      } else {
        toggleAddButton(false);
      }
      return hasError;
  }
};

const onBlurHandler = ({ elements }) => {
  for (let iterator in elements) {
    elements[iterator].addEventListener("blur", (e) => {
      let errorPara = document.getElementById(
        `${e.target.id}`
      ).nextElementSibling;
      let { value, name } = e.target;
      validator({ value: value, name: name, errorPara: errorPara });
    });
  }
};

const formGenerator = () => {
  formIndex += 1;
  globalValues = [
    ...globalValues,
    { name: "", age: "", userName: "", id: `form${formIndex}` },
  ];
  const node = document.createElement("div");
  node.setAttribute("class", `formContainer form${formIndex} animate`);
  node.setAttribute("id", `form${formIndex}`);
  const nameInput = document.createElement("input");
  attributesSetter({
    elem: nameInput,
    type: "text",
    classNames: `inputsDisplay animate nameInput`,
    name: `name${formIndex}`,
    placeHolder: "*Name",
    id: `name${formIndex}`,
  });
  const errorName = document.createElement("p");
  attributesSetter({
    elem: errorName,
    type: null,
    classNames: `errors animate errorName${formIndex}`,
    name: null,
    placeHolder: null,
    id: `errorName${formIndex}`,
  });
  node.appendChild(nameInput);
  node.appendChild(errorName);
  const userNameInput = document.createElement("input");
  attributesSetter({
    elem: userNameInput,
    type: "text",
    classNames: `inputsDisplay animate userNameInput`,
    name: `userName${formIndex}`,
    placeHolder: "*User Name",
    id: `userName${formIndex}`,
  });
  const errorUserName = document.createElement("p");
  attributesSetter({
    elem: errorUserName,
    type: null,
    classNames: `errors animate errorUserName${formIndex}`,
    name: null,
    placeHolder: null,
    id: `errorUserName${formIndex}`,
  });

  setTimeout(() => {
    node.appendChild(userNameInput);
    node.appendChild(errorUserName);
  }, 300);
  const ageInput = document.createElement("input");
  attributesSetter({
    elem: ageInput,
    type: "number",
    classNames: `inputsDisplay animate ageInput`,
    name: `age${formIndex}`,
    placeHolder: "*Age",
    id: `age${formIndex}`,
  });
  const errorAge = document.createElement("p");
  attributesSetter({
    elem: errorAge,
    type: null,
    classNames: `errors animate errorAge${formIndex}`,
    name: null,
    placeHolder: null,
    id: `errorAge${formIndex}`,
  });

  setTimeout(() => {
    node.appendChild(ageInput);
    node.appendChild(errorAge);
  }, 500);
  const removeButton = document.createElement("button");
  const textNodeREmove = document.createTextNode("Remove");
  removeButton.appendChild(textNodeREmove);
  attributesSetter({
    elem: removeButton,
    type: null,
    classNames: `removeBtns animate-delay remove${formIndex}`,
    name: null,
    placeHolder: null,
    id: `remove${formIndex}`,
  });
  setTimeout(() => {
    node.appendChild(removeButton);
  }, 700);

  removeButton.addEventListener("click", () => {
    formRemover({ node: node, id: node.getAttribute("id") });
    toggleAddButton(false);
  });
  onBlurHandler({
    elements: {
      nameInput: nameInput,
      userNameInput: userNameInput,
      ageInput: ageInput,
    },
  });
  return formBlocks.appendChild(node);
};

const onMount = () => {
  formGenerator();
};
onMount();
const validateLastForm = () => {
  let hasError = validator({
    value: "",
    name: "",
    errorPara: {},
  });
  return hasError;
};

appendBtn.addEventListener("click", () => {
  let hasFirstForm = document.getElementById("forms").firstChild ? true : false;
  if (!hasFirstForm) {
    formGenerator();
  } else {
    let hasError = validateLastForm();
    !hasError && formGenerator();
  }
});
submitBtn.addEventListener("click", () => {
  let hasError = validateLastForm();
  if (!hasError) {
    alert(JSON.stringify(globalValues));
  }
});
