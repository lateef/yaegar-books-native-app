describe('Yaegar Books Log In', () => {
    beforeEach(async () => {
        await device.reloadReactNative();
        await device.launchApp();
        await setTimeout('', 60000);
    });

    afterEach(() => {
    });

    it('should return log in error when invalid email or password', async () => {
        await expect(element(by.id('landingTitle'))).toHaveText('Yaegar Books');
        await element(by.id('landingLogInButton')).tap();

        await expect(element(by.id('logInTitle'))).toHaveText('Log In');
        await expect(element(by.id('logInHeading'))).toHaveText('Enter your email address/password');
        await element(by.id('logInEmailInput')).typeText('bademail.com');
        await element(by.id('logInPasswordInput')).typeText('badpassword');
        await element(by.id('logInContinueButton')).tap();

        await expect(element(by.id('logInErrorLabel'))).toHaveText("That's not a valid email address");
    });

    it('should log in successfully', async () => {
        await expect(element(by.id('landingTitle'))).toHaveText('Yaegar Books');
        await element(by.id('landingLogInButton')).tap();

        await expect(element(by.id('logInTitle'))).toHaveText('Log In');
        await expect(element(by.id('logInHeading'))).toHaveText('Enter your email address/password');

        await element(by.id('logInEmailInput')).typeText('adenijiadele@yahoo.com');
        await element(by.id('logInPasswordInput')).typeText('Qq1111');
        await element(by.id('logInContinueButton')).tap();

        await expect(element(by.id('dashboardTitle'))).toHaveText('Yaegar Books Dashboard');
    });

    it('should go straight to login if app is aware of a user', async () => {

    });

    it('should not go straight to login if app is not aware of a user', async () => {

    });

    it('should have email on forgot password if app is aware of a user', async () => {

    });

    it('should not have email on forgot password if app is aware of a user', async () => {

    });
});