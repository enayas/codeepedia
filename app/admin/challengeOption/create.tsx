import {BooleanInput, Create, NumberInput, ReferenceInput, required, SimpleForm, TextInput} from "react-admin";

export const ChallengeOptionCreate = () => {
  return(
    <Create>
      <SimpleForm>
        <TextInput source="text" label="Answer" validate={[required()]}/>
        <ReferenceInput source="challengeId" reference="challenges"/>
        <NumberInput source="order" validate={[required()]} label="Order"/>
        <BooleanInput source="correct" label="Correct option"/>
        <TextInput source="imageSrc" label="Image"/>
      </SimpleForm>
    </Create>
  )
};