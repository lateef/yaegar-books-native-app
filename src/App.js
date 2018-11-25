import React from 'react';
import {Navigation} from "react-native-navigation";

import {registerScreens} from "./screens";
import {iconsMap, iconsLoaded} from './util/app-icons';

export default class App extends React.Component {
    startApp() {
        iconsLoaded.then(() => {
        });
        registerScreens();
        Navigation.events().registerAppLaunchedListener(() => {
            Navigation.setRoot({
                root: {
                    component: {
                        name: "Initializing"
                    }
                }
            });
        });
    }
}

export const goToAuth = (currentTabId) => {
    Navigation.setRoot({
        root: {
            bottomTabs: {
                id: 'authBottomTabsId',
                children: [
                    {
                        stack: {
                            id: 'signUpId',
                            children: [{
                                component: {
                                    name: 'SignUp',
                                    options: {
                                        bottomTab: {
                                            text: 'Sign Up',
                                            fontSize: 12,
                                            icon: iconsMap['ios-person-add']
                                        }
                                    }
                                }
                            }]
                        }
                    },
                    {
                        stack: {
                            id: 'signInId',
                            children: [{
                                component: {
                                    name: 'SignIn',
                                    options: {
                                        bottomTab: {
                                            text: 'Sign In',
                                            fontSize: 12,
                                            icon: iconsMap['ios-log-in']
                                        }
                                    }
                                }
                            }]
                        }
                    }
                ]
            }
        }
    });

    Navigation.mergeOptions('authBottomTabsId', {
        bottomTabs: {
            currentTabId: currentTabId
        }
    });
};

export const goToHome = () => Navigation.setRoot({
    root: {
        sideMenu: {
            id: 'homeSideMenu',
            left: {
                component: {
                    id: 'drawerId',
                    name: 'Drawer'
                }
            },
            center: {
                bottomTabs: {
                    id: 'homeBottomTabsId',
                    children: [
                        {
                            stack: {
                                children: [
                                    {
                                        component: {
                                            name: 'Home',
                                            options: {
                                                topBar: {
                                                    title: {
                                                        text: 'Yaegar',
                                                        fontSize: 20,
                                                        color: '#ffffff',
                                                        fontFamily: 'Helvetica'
                                                    },
                                                    background: {
                                                        color: '#161616'
                                                    },
                                                    leftButtons: [{
                                                        icon: iconsMap['ios-menu'],
                                                        color: '#ffffff',
                                                        id: 'menu'
                                                    }],
                                                    rightButtons: [{
                                                        icon: iconsMap['ios-notifications'],
                                                        color: '#ffffff',
                                                        id: 'notificationMenu'
                                                    }]
                                                },
                                                bottomTab: {
                                                    text: 'Home',
                                                    fontSize: 12,
                                                    icon: iconsMap['ios-home']
                                                }
                                            }
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            stack: {
                                id: 'businessId',
                                children: [
                                    {
                                        component: {
                                            name: 'Business',
                                            options: {
                                                topBar: {
                                                    title: {
                                                        text: 'Yaegar',
                                                        fontSize: 20,
                                                        color: '#ffffff',
                                                        fontFamily: 'Helvetica'
                                                    },
                                                    background: {
                                                        color: '#161616'
                                                    },
                                                    leftButtons: [{
                                                        icon: iconsMap['ios-menu'],
                                                        color: '#ffffff',
                                                        id: 'menu'
                                                    }],
                                                    rightButtons: [{
                                                        icon: iconsMap['ios-notifications'],
                                                        color: '#ffffff',
                                                        id: 'notificationMenu'
                                                    }]
                                                },
                                                bottomTab: {
                                                    text: 'Business',
                                                    fontSize: 12,
                                                    icon: iconsMap['ios-business']
                                                }
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            },
            right: {
                component: {
                    name: 'Home'
                }
            },
        }
    }
});

export function goToAddBank() {
    toggleDrawer();

    navigateTo('businessId', 'AddBank', {}, 'Add bank account', '#161616');

    Navigation.mergeOptions('homeBottomTabsId', {
        bottomTabs: {
            currentTabId: 'businessId'
        }
    });
}

export function goToAddProduct() {
    toggleDrawer();

    navigateTo('businessId', 'AddProduct', {}, 'Add a product', '#161616');

    Navigation.mergeOptions('homeBottomTabsId', {
        bottomTabs: {
            currentTabId: 'businessId'
        }
    });
    navigateTo('productId', 'AddProduct', {}, 'Add a product', '#161616');
}

export function toggleDrawer() {
    Navigation.mergeOptions("homeSideMenu", {
        sideMenu: {
            left: {
                visible: false
            },
            right: {
                visible: false
            }
        }
    });
}

export function navigateTo(componentId, name, props, text, color) {
    Navigation.push(componentId, {
        component: {
            name: name,
            passProps: props,
            options: {
                topBar: {
                    title: {
                        text: text,
                        color: color
                    }
                }
            }
        }
    });
}

export function showModal(name, props, text, color) {
    Navigation.showModal({
        stack: {
            children: [{
                component: {
                    name: name,
                    passProps: props,
                    options: {
                        topBar: {
                            title: {
                                text: text,
                                color: '#ffffff'
                            },
                            background: {
                                color: color
                            },
                            leftButtons: [{
                                icon: iconsMap['ios-arrow-round-back'],
                                color: '#ffffff',
                                id: 'backButton'
                            }]
                        }
                    }
                }
            }]
        }
    });
}

export function dismissModal(componentId) {
    Navigation.dismissModal(componentId);
}

export function dismissAllModals() {
    Navigation.dismissAllModals();
}

export function pop(componentId) {
    Navigation.pop(componentId);
}
