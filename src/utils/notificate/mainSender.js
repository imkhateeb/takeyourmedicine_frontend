import SendEmail from "./SendMail";

const CreateScheduleAndSend = ({to_name, to_email, message}) => {
   SendEmail(to_name, to_email, message);
   // console.log(to_name, to_email, message);
}

export default CreateScheduleAndSend;