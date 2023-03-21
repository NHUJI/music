// 本地注册的指令,作为icon的副本
export default {
  // 之所以使用beforeMount,是想要在插入DOM之前就把icon加上去
  beforeMount(el, binding) {
    let iconClass = `fa fa-${binding.value.icon} text-green-400 text-xl`;

    if (binding.value.right) {
      iconClass += " float-right"; // 不要忘记空格
    }

    el.innerHTML += `<i class="${iconClass}"></i>`;
  },
};
