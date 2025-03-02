import {Edit, NumberInput, ReferenceInput, required, SelectInput, SimpleForm, TextInput} from "react-admin";

export const ChallengeEdit = () => {
  return(
    <Edit>
      <SimpleForm>
        <TextInput source="question" label="Question" validate={[required()]}/>
        <ReferenceInput source="lessonId" reference="lessons"/>
        <NumberInput source="order" validate={[required()]} label="Order"/>
        <SelectInput source="type" validate={[required()]} choices={[{
          id: "SELECT",
          name: "SELECT",
        },
        {
          id: "ASSIST",
          name: "ASSIST",
        },
      ]}/>
      </SimpleForm>
    </Edit>
  )
};