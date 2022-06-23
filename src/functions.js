export var children = (where, argu) => {
  where.appendChild(argu);
};
export var addelem = (argu, nomel) => {
  argu.classList.add(nomel);
};
export var removeel = (ell) => {
  while (ell.firstChild) {
    ell.removeChild(ell.firstChild);
  }
};
export var ineer = (argu, text) => {
  argu.innerHTML = text;
};
