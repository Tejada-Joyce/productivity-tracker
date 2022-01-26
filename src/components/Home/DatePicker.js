import styles from './DatePicker.module.css';

const DatePicker = (props) => {
    return (
        <div className={styles.datePicker}>
            <button onClick={props.clickHandler} value={false}>&#8592;</button>
            <input type='text' value={props.date} disabled />
            <button onClick={props.clickHandler} value={true}>&#8594;</button>
        </div>
    );
};

export default DatePicker;