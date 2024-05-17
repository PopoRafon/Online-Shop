import SettingsForm from '@components/Settings/SettingsForm';

export default function Settings() {
    return (
        <main className="auth-form-page">
            <section className="primary-border auth-form-container">
                <h2 className="auth-form-header">Account Settings</h2>
                <SettingsForm />
            </section>
        </main>
    );
}
