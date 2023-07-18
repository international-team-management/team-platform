import { ChangeEvent, useState, useRef } from "react"
import { ButtonTemplate } from "src/components/UI/button-template/ButtonTemplate";
import { Input } from "src/components/UI/input-template/InputTemplate"
import { input } from "src/typings/constants";
import { helperTexts } from "src/utils/validation/helperTexts"

export const LoginPage = () => {
  const [emailValue, setEmailValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const password = useRef();

  const emailHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmailValue(value);
  }

  const showPasswordHandler = () => {
    console.log('click')
    setShowPassword(!showPassword);
  }

  return (
    <main>
      <Input
        type={input.EMAIL}
        name='name'
        label='Email'
        value={emailValue}
        placeholder='email'
        helperText={helperTexts.PASSWORD}
        isValid={false}
        onChange={emailHandler}
      />
      <Input
        type={!showPassword ? input.PASSWORD : input.TEXT}
        name="password"
        label='Password'
        isPassword={true}
        isValid={false}
        ref={password}
        onToogle={showPasswordHandler}
      />
      <ButtonTemplate
        text="Send"
        isDisabled={true}
      />
    </main>
  )
}
