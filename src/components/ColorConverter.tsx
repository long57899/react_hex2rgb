import './ColorConverter.css';
import { FC, useState } from "react";

type FormType = {
    name: string;
};

export const ColorConverter: FC = () => {

    const [form, setForm] = useState<FormType>({ name: "" });
    const [outputColor, setOutputColor] = useState<string>('');
    const [error, setError] = useState<boolean>(true);

    const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        let {
          target: { name, value },
        } = e;
    
        const answer = hex2rgb(value);

        if (value.length > 7) {
            setOutputColor('Ошибка!');
            document.body.style.backgroundColor = 'red';
        };
        
        if ((value.length == 7) && (!error)) {
            setOutputColor('Ошибка!');
            document.body.style.backgroundColor = 'red';
        };
        
        if (value.length == 7 && answer != null) {
            setOutputColor(`rgb(${answer.r}, ${answer.g}, ${answer.b})`);
            document.body.style.backgroundColor = value;
        };
        

        setForm((prev) => ({ ...prev, [name]: value }));
    
    }
    
    function hex2rgb(c: string) {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(c);
        setError(!!result);

        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    return (
        <form>
            <div className='box'>
                <input className="input" type="text" name="name" value={form.name} onChange={handleForm}/>
                <output className='output'>{outputColor}</output>
            </div>
        </form>
    );
};