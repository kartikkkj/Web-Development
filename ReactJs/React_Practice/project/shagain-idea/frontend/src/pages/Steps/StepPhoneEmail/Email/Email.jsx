import React, { useState } from 'react';
import Card from '../../../../components/shared/Card/Card';
import Button from '../../../../components/shared/Button/Button';
import TextInput from '../../../../components/shared/TextInput/TextInput';
import styles from '../StepPhoneEmail.module.css';
import { useDispatch } from 'react-redux';
import { sendOtpE } from '../../../../http';
import { setOtpE } from '../../../../store/authSlice';

const Email = ({ onNext }) => {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    async function submit() {
        if (!email) return;
        const { data } = await sendOtpE({ email: email });
        dispatch(setOtpE({ email: data.email, hash: data.hash }));
        onNext();
    }
    return (
        <Card title="Enter your email id" icon="email-emoji">
            <TextInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <div>
                <div className={styles.actionButtonWrap}>
                    <Button text="Next" onClick={submit} />
                </div>
                <p className={styles.bottomParagraph}>
                    By entering your number, you’re agreeing to our Terms of
                    Service and Privacy Policy. Thanks!
                </p>
            </div>
        </Card>
    );
};

export default Email;
