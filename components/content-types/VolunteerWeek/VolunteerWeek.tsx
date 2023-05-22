import React, { useState } from "react";
import Input from "../../form/Input/Input";
interface IProps {
  title: string;
  data: string[];
}
const VolunteerWeek: React.FC<IProps> = ({ title, data }) => {
  const [edit, setEdit] = useState(false);
  const handleChange = (e: any) => {
    console.log(e);
  };
  return (
    <div
      className="volunteer-week-box border-[5px] border-[#3FC7B4] p-[32px]"
      onBlur={() => setEdit(false)}
      onClick={() => setEdit(true)}
    >
      <div>
        <h3 className="">{title}</h3>
        <div>
          <ul>
            {data.map((volunteer) => (
              <li>
                <Input
                  onChange={handleChange}
                  disabled={edit}
                  defaultValue={volunteer}
                />
                <div>{volunteer}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VolunteerWeek;
