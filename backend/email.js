const recipient = 'magdaidlascu@gmail.com';
const subject = 'Hello';
const body = 'This is the body of the email.';

const sendEmail = () => {
    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
}

