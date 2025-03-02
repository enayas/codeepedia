import {BooleanInput, Edit, NumberInput, ReferenceInput, required, SelectInput, SimpleForm, TextInput} from "react-admin";

export const ChallengeOptionEdit = () => {
  return(
    <Edit>
      <SimpleForm>
        <TextInput source="text" label="Answer" validate={[required()]}/>
        <ReferenceInput source="challengeId" reference="challenges"/>
        <NumberInput source="order" validate={[required()]} label="Order"/>
        <BooleanInput source="correct" label="Correct option"/>
        <TextInput source="imageSrc" label="Image"/>
      </SimpleForm>
    </Edit>
  )
};