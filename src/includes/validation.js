// 使用as防止冲突
import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage
} from 'vee-validate'
//导入需要的规则并在上方添加defineRule以运行我们全局注册规则
import {
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
  email,
  max_value as MaxVal,
  min_value as MinVal,
  numeric,
  confirmed,
  not_one_of
} from '@vee-validate/rules'

export default {
  install(app) {
    app.component('VeeForm', VeeForm)
    app.component('VeeField', VeeField)
    app.component('ErrorMessage', ErrorMessage)

    // 第一个是自己的命名,第二个是执行验证的函数(也就是我们上面import的那个,不用自己定义函数)
    defineRule('required', required)
    defineRule('min', min)
    defineRule('max', max)
    defineRule('alpha_spaces', alphaSpaces)
    defineRule('email', email)
    defineRule('max_value', MaxVal)
    defineRule('min_value', MinVal)
    defineRule('numeric', numeric)
    defineRule('confirmed', confirmed)
    defineRule('excluded', not_one_of)
  }
}
