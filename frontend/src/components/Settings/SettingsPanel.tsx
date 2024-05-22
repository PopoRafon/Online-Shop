import { Link } from 'react-router-dom';

export default function SettingsPanel() {
    return (
        <div className="settings-panel">
            <Link
                to='/password/change'
                className="primary-button settings-panel-button"
            >
                Change Password
            </Link>
            <button
                className="primary-button settings-panel-button"
                type="button"
            >
                Delete Account
            </button>
        </div>
    );
}
