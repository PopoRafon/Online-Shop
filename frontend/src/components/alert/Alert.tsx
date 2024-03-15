import { useEffect } from 'react';
import useAlertContext from '@contexts/AlertContext/useAlertContext';
import CheckIcon from '@assets/images/icons/check_icon.svg';
import CloseIcon from '@assets/images/icons/close_icon.svg';

export default function Alert() {
    const { alert, setAlert } = useAlertContext();

    useEffect(() => {
        if (alert.show) {
            setTimeout(() => {
                setAlert({ ...alert, show: false });
            }, 5e3);
        }
    }, [alert, setAlert]);

    return alert.show && (
        <section className="alert">
            <img
                height={40}
                width={40}
                src={CheckIcon}
                alt="Check icon"
            />
            <div className="alert-info">
                <h3 className="alert-info-header">Success!</h3>
                <p className="alert-info-body">{alert.text}</p>
            </div>
            <button
                className="alert-close-button"
                onClick={() => setAlert({ ...alert, show: false })}
            >
                <img
                    src={CloseIcon}
                    alt="Close alert icon"
                />
            </button>
            <div className="alert-disappearance-timer"></div>
        </section>
    );
}
