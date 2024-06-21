//import './FormInput.scss'
import {FormInputLabel, Input, Group} from './FormInputStyle'
const FormInput = ({ label, ...otherProps }) => {
    return (
        <Group>
            <Input
                {...otherProps}
            />
            {label && (
                <FormInputLabel shrink={otherProps.value.length} >
                {label}
                </FormInputLabel>
            )} 
        </Group>
    )
}
export default FormInput;