import fetchMock from 'fetch-mock'

describe('Yaegar Books Sign Up', () => {
    beforeEach(async () => {
        await device.reloadReactNative();
    });

    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
    });

    it('should return error when invalid email is used', async () => {
        await expect(element(by.id('landingTitle'))).toHaveText('Yaegar Books');
        await element(by.id('landingSignUpButton')).tap();

        await expect(element(by.id('signUpTitle'))).toHaveText('Sign Up');
        await expect(element(by.id('signUpHeading'))).toHaveText('Enter your email address');
        await expect(element(by.id('signUpContinueButton'))).toBeNotVisible();

        await element(by.id('signUpEmailInput')).typeText('bademail.com');
        await expect(element(by.id('signUpContinueButton'))).toBeVisible();
        await element(by.id('signUpContinueButton')).tap();

        await expect(element(by.id('signUpErrorLabel'))).toHaveText("That's not a valid email address");
    });

    it('should return username already exists', async () => {
        await expect(element(by.id('landingTitle'))).toHaveText('Yaegar Books');
        await element(by.id('landingSignUpButton')).tap();

        await expect(element(by.id('signUpTitle'))).toHaveText('Sign Up');
        await expect(element(by.id('signUpHeading'))).toHaveText('Enter your email address');
        await expect(element(by.id('signUpContinueButton'))).toBeNotVisible();

        await element(by.id('signUpEmailInput')).typeText('goodemail@email.com');
        await expect(element(by.id('signUpContinueButton'))).toBeVisible();
        await element(by.id('signUpContinueButton')).tap();

        await expect(element(by.id('signUpContinueTitle'))).toHaveText('Sign Up');
        await expect(element(by.id('signUpContinueHeading'))).toHaveText('Enter your password');

        await element(by.id('signUpContinuePasswordInput')).clearText();
        await element(by.id('signUpContinuePasswordAgainInput')).clearText();
        await element(by.id('signUpContinuePasswordInput')).typeText('Qq1111');
        await element(by.id('signUpContinuePasswordAgainInput')).typeText('Qq1111');

        fetchMock.once('https://cognito-idp.eu-west-1.amazonaws.com/', {
            body: {
                code: "UsernameExistsException",
                message: "User already exists",
                name: "UsernameExistsException"
            }
        });

        await element(by.id('signUpContinueSignUpButton')).tap();

        // await expect(element(by.id('signUpConfirmationSentTitle'))).toHaveText('Sign Up Email Sent');
    });
});