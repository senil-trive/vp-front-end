import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import ENDPOINTS from "../../../constants/endpoints";
import Input from "../../form/Input/Input";
import { VolunteerWrapper } from "./VolunteerWeek.styles";

interface IProps {
  title: string;
  data: string[] | null;
  id: string;
  className?: string;
  name?: string;
  volunteerweek: any;
  setVolunteerWeek: (params: any) => void;
}

const VolunteerWeek: React.FC<IProps> = ({
  title,
  data,
  id,
  className,
  name,
  volunteerweek,
  setVolunteerWeek,
}) => {
  const [updatevolunteerweek, setUpdatevolunteerweek] = useState(volunteerweek);
  const [edit, setEdit] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  function localStorageCheck() {
    // const week1 = localStorage.getItem("week1");
    // const week2 = localStorage.getItem("week2");
    // const week3 = localStorage.getItem("week3");
    // const week4 = localStorage.getItem("week4");
    // const week5 = localStorage.getItem("week5");
    // setVolunteerWeek({
    //   ...volunteerweek,
    //   week1: week1 === null ? null : JSON.parse(week1),
    //   week2: week2 === null ? null : JSON.parse(week2),
    //   week3: week3 === null ? null : JSON.parse(week3),
    //   week4: week4 === null ? null : JSON.parse(week4),
    //   week5: week5 === null ? null : JSON.parse(week5),
    // });
  }
  useEffect(() => {
    async function handleClickOutside(event: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        setEdit(false);
        if (activeId !== null) {
          await fetch(
            `${ENDPOINTS.COLLECTIONS}/volunteer_week_work/${activeId}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...updatevolunteerweek[Number(activeId) - 1],
              }),
            }
          ).then(async (res) => {
            if (res) {
              const weekworkres = await fetch(
                `${ENDPOINTS.COLLECTIONS}/volunteer_week_work`,
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              const wrkvolunteer = await weekworkres.json();
              setVolunteerWeek(wrkvolunteer.data);
            }
          });
        }
        setActiveId(null);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [updatevolunteerweek]);

  const handleClick = async (currentActive: string | null) => {
    if (currentActive !== id) {
      setEdit(false);
      setActiveId(null);
      // await fetch(
      //   `${ENDPOINTS.COLLECTIONS}/volunteer_week_work/${currentActive}`,
      //   {
      //     method: "PATCH",
      //   }
      // );
    }
    setEdit(true);
    setActiveId(id);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    id: string
  ) => {
    setUpdatevolunteerweek((prevVolunteerWeek: any) => {
      const updatedWeek = [...prevVolunteerWeek];
      const descriptionList =
        updatedWeek[Number(id) - 1]?.description_list || [];
      const updatedDescriptionList = descriptionList.map(
        (item: any, idx: number) => {
          if (idx === index) {
            return { ...item, work: e.target.value };
          } else {
            return item;
          }
        }
      );
      updatedWeek[Number(id) - 1] = {
        ...updatedWeek[Number(id) - 1],
        description_list: updatedDescriptionList,
      };
      return updatedWeek;
    });
  };
  const handleContentClick = (event: any) => {
    event.stopPropagation();
    const parentDiv = event.currentTarget.parentNode;
    parentDiv.click();
  };
  return (
    <VolunteerWrapper
      className={`${className} volunteer-week-box border-[5px] border-[#3FC7B4] p-[32px] ${
        activeId === id ? "active" : ""
      }`}
      onClick={() => handleClick(activeId)}
      ref={boxRef}
    >
      <div className="line hidden md:block"></div>
      <div className="circle hidden md:block"></div>
      <div>
        <div className="flex items-center">
          <h3 className="week-title text-[24px] pr-[10px]">{title} </h3>

          <Image
            src="/calendar.png"
            width={25}
            height={25}
            alt="Calendar icon for week box"
          />
        </div>
        <div onClick={handleContentClick}>
          <ul>
            {data !== null &&
              data?.map((volunteer: any, index) => (
                <li key={index} className="pt-2">
                  {edit && activeId === id ? (
                    <Input
                      onChange={(e) => handleChange(e, index, id)}
                      defaultValue={volunteer?.work}
                      name={`${name}${index}`}
                      className="input-box"
                    />
                  ) : (
                    <div>{volunteer?.work}</div>
                  )}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </VolunteerWrapper>
  );
};

export default VolunteerWeek;
