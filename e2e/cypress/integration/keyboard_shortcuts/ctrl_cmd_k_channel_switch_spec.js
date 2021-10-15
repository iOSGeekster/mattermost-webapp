// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

// ***************************************************************
// - [#] indicates a test step (e.g. # Go to a page)
// - [*] indicates an assertion (e.g. * Check the title)
// - Use element ID when selecting an element. Create one if none.
// ***************************************************************

// Group: @keyboard_shortcuts¨

describe('Keyboard Shortcuts', () => {
    let testChannel;
    let testUser;

    before(() => {
        cy.apiInitSetup().then(({channel, user, channelUrl}) => {
            testUser = user;
            testChannel = channel;
            cy.apiAddUserToChannel(testChannel.id, testUser.id);
            cy.visit(channelUrl);
        });
    });

    it('MM-T1242 - CTRL/CMD+K - Typed characters are not lost after switching channels', () => {
        const message = 'Hello World!';

        // # Type CTRL/CMD+K to open 'Switch Channels'
        cy.get('#post_textbox').cmdOrCtrlShortcut('K');

        // # Type ENTER to switch to new channel
        cy.get('#quickSwitchInput').type('{enter}');

        // # Typing message
        cy.get('body').type(message);

        // * Textbox should have text equal to message
        cy.get('#post_textbox').should('have.text', message);
    });
});
