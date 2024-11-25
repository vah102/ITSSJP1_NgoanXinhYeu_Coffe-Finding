import classNames from "classnames/bind";
import styles from "./TextField.module.css";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

type TextFieldProps = {
    placeholder: string;
    type: string;
    onChange: (e: any) => void;
    onSubmit: (e: any) => void;
    value: string;
};

function TextField({ placeholder, type, onChange, value, onSubmit }: TextFieldProps) {
    return (
        <form className={cx('wrapper')} onSubmit={onSubmit}>
            <input
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                className={cx('input')}
            />
            <Button type="submit" icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}></Button>
        </form>
    );
}

export default TextField;
