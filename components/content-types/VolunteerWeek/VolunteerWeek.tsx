// import Image from "next/image";
// import React, { useRef, useState, useEffect } from "react";
// import Input from "../../form/Input/Input";

// interface IProps {
//   title: string;
//   data: string[];
//   id: string;
// }

// const VolunteerWeek: React.FC<IProps> = ({ title, data, id }) => {
//   const [edit, setEdit] = useState(false);
//   const [activeId, setActiveId] = useState<string | null>(null);
//   const boxRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
//         setEdit(false);
//         setActiveId(null);
//       }
//     }

//     document.addEventListener("click", handleClickOutside);

//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, []);

//   const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
//     e.stopPropagation();
//     setEdit(true);
//     setActiveId(id);
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     console.log({ [e.target.name]: e.target.value });
//   };

//   return (
//     <div
//       className={`volunteer-week-box border-[5px] border-[#3FC7B4] p-[32px] ${
//         activeId === id ? "active" : ""
//       }`}
//       onClick={handleClick}
//       ref={boxRef}
//     >
//       <div>
//         <div className="flex items-center">
//           <h3 className="text-[24px] pr-[10px]">{title} </h3>

//           <Image
//             src="/calendar.svg"
//             width={25}
//             height={25}
//             alt="Calendar icon for week box"
//           />
//         </div>
//         <div>
//           <ul>
//             {data.map((volunteer, index) => (
//               <li key={index} className="pt-2">
//                 {edit && activeId === id ? (
//                   <Input
//                     onChange={handleChange}
//                     disabled={!edit}
//                     defaultValue={volunteer}
//                   />
//                 ) : (
//                   <div>{volunteer}</div>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VolunteerWeek;
