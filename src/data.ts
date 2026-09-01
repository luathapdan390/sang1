import { RawQuestion, SkillType } from './types';

export const PASSAGE_QUET = `GREEN HILL ENGLISH CLUB — SUMMER PROGRAMME
Classes start on Monday, 6 July and finish on Friday, 28 August.
Morning classes: 8:00 – 10:00, Room 105 (for students aged 10–12)
Afternoon classes: 2:00 – 4:00, Room 203 (for students aged 13–15)
Speaking Club: every Saturday, 9:00 – 11:00, in the school garden
Price: 500,000 VND a month. Brothers and sisters pay only 400,000 VND each.
Free for every new member: one club T-shirt and one notebook.
Bring a dictionary, a pen and a bottle of water. Do not bring food.
To join, send an email to greenhill@mail.com before 30 June.
Ms Lan answers the phone from Monday to Friday, 8:00 – 5:00. Phone: 0912 345 678.`;

export const PASSAGE_DOC = `When Nam moved to a new school last year, he was not happy at all. He did not know anybody, and at lunchtime he always sat alone near the window. His old friends lived far away, and he only saw them once a month.

One Tuesday, his teacher put a poster on the wall about the school gardening club. Nam liked plants, but he was afraid that the other students would laugh at him, so he did nothing for two weeks. Then one afternoon he saw a boy from his class watering some small trees behind the library. The boy, Minh, smiled and asked Nam to help him. Nam said yes.

After that, Nam went to the garden every Tuesday and Thursday. He learned the names of many plants, and he taught Minh how to grow tomatoes, something his grandfather had shown him in the countryside. Slowly, other students joined them.

Now Nam still misses his old friends, but he no longer eats lunch alone. He says the garden did not only grow vegetables; it grew friends too.`;

export const RAW_QUESTIONS: RawQuestion[] = [
  {"cau":1,"kyNang":"TU","hoi":"My father works in a garage. He is a ____ and he fixes cars.","A":"mechanic","B":"teacher","C":"farmer","D":"cook","dapAn":"A"},
  {"cau":2,"kyNang":"TU","hoi":"It is raining. Do not forget to take your ____.","A":"sunglasses","B":"umbrella","C":"towel","D":"helmet","dapAn":"B"},
  {"cau":3,"kyNang":"TU","hoi":"My sister is very ____. She never says anything in class.","A":"noisy","B":"funny","C":"shy","D":"lazy","dapAn":"C"},
  {"cau":4,"kyNang":"TU","hoi":"We keep milk and vegetables in the ____.","A":"cupboard","B":"oven","C":"microwave","D":"fridge","dapAn":"D"},
  {"cau":5,"kyNang":"TU","hoi":"Look! The cat is ____ up the tree.","A":"flying","B":"climbing","C":"swimming","D":"riding","dapAn":"B"},
  {"cau":6,"kyNang":"TU","hoi":"I feel ____. Can I have a glass of water?","A":"hungry","B":"sleepy","C":"thirsty","D":"angry","dapAn":"C"},
  {"cau":7,"kyNang":"TU","hoi":"The word OPPOSITE in meaning to 'expensive' is ____.","A":"rich","B":"costly","C":"valuable","D":"cheap","dapAn":"D"},
  {"cau":8,"kyNang":"TU","hoi":"My grandmother ____ delicious cakes every Sunday morning.","A":"bakes","B":"builds","C":"paints","D":"washes","dapAn":"A"},
  {"cau":9,"kyNang":"TU","hoi":"Be ____! The floor is very wet.","A":"careless","B":"careful","C":"carefully","D":"care","dapAn":"B"},
  {"cau":10,"kyNang":"TU","hoi":"We went to the ____ to borrow some books about animals.","A":"museum","B":"market","C":"library","D":"hospital","dapAn":"C"},
  {"cau":11,"kyNang":"QUET","hoi":"What time do the afternoon classes begin?","A":"2:00","B":"4:00","C":"8:00","D":"10:00","dapAn":"A"},
  {"cau":12,"kyNang":"QUET","hoi":"Which room is for students aged 10-12?","A":"Room 203","B":"Room 301","C":"Room 250","D":"Room 105","dapAn":"D"},
  {"cau":13,"kyNang":"QUET","hoi":"Where does the Speaking Club meet?","A":"in Room 105","B":"in Room 203","C":"in the school garden","D":"at the library","dapAn":"C"},
  {"cau":14,"kyNang":"QUET","hoi":"How much does ONE student pay for a month?","A":"400,000 VND","B":"500,000 VND","C":"300,000 VND","D":"600,000 VND","dapAn":"B"},
  {"cau":15,"kyNang":"QUET","hoi":"When is the last day of the programme?","A":"28 August","B":"6 July","C":"30 June","D":"1 September","dapAn":"A"},
  {"cau":16,"kyNang":"QUET","hoi":"What does every new member get free?","A":"a dictionary and a pen","B":"a bottle of water","C":"food and drink","D":"a T-shirt and a notebook","dapAn":"D"},
  {"cau":17,"kyNang":"QUET","hoi":"What must students NOT bring to the club?","A":"a pen","B":"a dictionary","C":"food","D":"water","dapAn":"C"},
  {"cau":18,"kyNang":"QUET","hoi":"How can a student join the club?","A":"by phoning Ms Lan on Sunday","B":"by sending an email before 30 June","C":"by going to Room 203","D":"by paying in the garden","dapAn":"B"},
  {"cau":19,"kyNang":"QUET","hoi":"On which days can you phone Ms Lan?","A":"from Monday to Friday","B":"on Saturday and Sunday","C":"every day of the week","D":"only on Saturday","dapAn":"A"},
  {"cau":20,"kyNang":"QUET","hoi":"How much do two sisters pay TOGETHER for one month?","A":"500,000 VND","B":"900,000 VND","C":"1,000,000 VND","D":"800,000 VND","dapAn":"D"},
  {"cau":21,"kyNang":"DOC","hoi":"How did Nam feel when he first came to the new school?","A":"excited","B":"lonely","C":"angry","D":"proud","dapAn":"B"},
  {"cau":22,"kyNang":"DOC","hoi":"How often did Nam see his old friends?","A":"every day","B":"every week","C":"once a month","D":"never","dapAn":"C"},
  {"cau":23,"kyNang":"DOC","hoi":"Why did Nam do nothing for two weeks after he saw the poster?","A":"He did not like plants.","B":"He had no free time.","C":"The club was already full.","D":"He was afraid the others would laugh at him.","dapAn":"D"},
  {"cau":24,"kyNang":"DOC","hoi":"Who asked Nam to help first?","A":"Minh","B":"his teacher","C":"his grandfather","D":"his old friends","dapAn":"A"},
  {"cau":25,"kyNang":"DOC","hoi":"The word 'him' in 'asked Nam to help him' refers to ____.","A":"Nam","B":"the teacher","C":"Minh","D":"Nam's grandfather","dapAn":"C"},
  {"cau":26,"kyNang":"DOC","hoi":"Where did Nam learn how to grow tomatoes?","A":"from his grandfather in the countryside","B":"from Minh in the garden","C":"from a book in the library","D":"from his teacher at school","dapAn":"A"},
  {"cau":27,"kyNang":"DOC","hoi":"How many days a week did Nam go to the garden?","A":"every day","B":"one day","C":"three days","D":"two days","dapAn":"D"},
  {"cau":28,"kyNang":"DOC","hoi":"What happened after Nam and Minh worked together in the garden?","A":"The club closed.","B":"More students joined them.","C":"The club moved to another school.","D":"The teacher stopped the club.","dapAn":"B"},
  {"cau":29,"kyNang":"DOC","hoi":"What does Nam mean when he says the garden 'grew friends too'?","A":"He made new friends through the club.","B":"The plants became his friends.","C":"His old friends came to the garden.","D":"He grew a plant called 'friend'.","dapAn":"A"},
  {"cau":30,"kyNang":"DOC","hoi":"What is the best title for the passage?","A":"How to Grow Tomatoes","B":"A Trip to the Countryside","C":"The Garden That Made Friends","D":"My Old School","dapAn":"C"}
];

export const SKILL_LABELS: Record<SkillType, { name: string; label: string; desc: string; badgeColor: string }> = {
  TU: {
    name: "Từ vựng (TU)",
    label: "Từ vựng",
    desc: "Kiểm tra vốn từ ngữ và ngữ cảnh",
    badgeColor: "bg-[#6BCB77] text-white border-[#4EAF5A]",
  },
  QUET: {
    name: "Quét thông tin (QUET)",
    label: "Quét thông tin",
    desc: "Tìm kiếm chi tiết từ thông báo CLB",
    badgeColor: "bg-[#4D96FF] text-white border-[#2E7BE6]",
  },
  DOC: {
    name: "Đọc hiểu (DOC)",
    label: "Đọc hiểu",
    desc: "Hiểu đoạn văn về cậu bạn Nam",
    badgeColor: "bg-[#FF8400] text-white border-[#D35400]",
  }
};

export const STUDENT_NAMES = ["Duy Sang"];

export const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbw00EtPyhylfx8ZUg3o7CFvc5g44RK17byvTJqy8kMY6grcfIVpTAT7Enu9NenGnBFR/exec";
