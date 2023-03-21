export default {
  // 之所以使用beforeMount,是想要在插入DOM之前就把icon加上去
  beforeMount(el, binding) {
    let iconClass = `fa fa-${binding.value} text-xl`;

    // 如果有参数,则将iconClass完全分配给绑定值
    if (binding.arg === "full") {
      iconClass = binding.value;
    }

    // 检查是否存在修饰符,它是布尔值
    if (binding.modifiers.right) {
      iconClass += " float-right"; // 不要忘记空格
    }

    // 提供几种颜色的修饰符
    if (binding.modifiers.yellow) {
      iconClass += " text-yellow-400";
    } else if (binding.modifiers.red) {
      iconClass += " text-red-400";
    } else if (binding.modifiers.blue) {
      iconClass += " text-blue-400";
    } else if (binding.modifiers.gray) {
      iconClass += " text-gray-400";
    } else {
      iconClass += " text-green-400"; // 默认颜色
    }

    el.innerHTML += `<i class="${iconClass}"></i>`;
  },
};
