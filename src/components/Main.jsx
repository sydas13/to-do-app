import Form from "./Form";
import ToDo from "./ToDo";
export default function Main() {
  return (
    <main className="w-screen my-10 flex flex-row mx-auto justify-center">
      <Form></Form>
      <div className="flex flex-col space-y-6 w-[50%] ">
        <ToDo></ToDo>
        <ToDo></ToDo>
        <ToDo></ToDo>
        <ToDo></ToDo>
      </div>
    </main>
  );
}
