import { Education } from "./education.model";
import { Experience } from "./experience.model";
import { Industry } from "./industry.model";
import { Reference } from "./reference.model";
import { Skill } from "./skill.model";

export class Profile {
    id!: string;
    first_name!: string;
    last_name!: string;
    email!: string;
    street!: string;
    city!: string;
    province!: string;
    postal_code!: string;
    country!: string;
    phone_number!: string;
    website!: string;
    title!: string;
    salary_rate!: number;
    industry!: Industry;
    availability!: number;
    employment_status!: string;
    skills!: Skill[];
    educations!: Education[];
    experiences!: Experience[];
    references!: Reference[];
}
