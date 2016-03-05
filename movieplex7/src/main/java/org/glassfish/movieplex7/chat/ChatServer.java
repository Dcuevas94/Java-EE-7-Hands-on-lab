/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.glassfish.movieplex7.chat;

import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
//import javax.jms.Session;
import javax.websocket.Session;
import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.server.ServerEndpoint;
import javax.websocket.*;

/**
 * A chat server for customers to chat in during the movie
 *
 * @author ivan
 */
@ServerEndpoint("/websocket")
public class ChatServer {

    private static final Set<Session> peers = Collections.synchronizedSet(new HashSet<Session>());

    /**
     * Decorates the methods that have to be called when opened.
     *
     * @param peer defines the client requesting connection initiation
     */
    @OnOpen
    public void onOpen(Session peer) {
        peers.add(peer);
    }

    /**
     *
     * @param peer defines the client requesting connection termination
     */
    @OnClose
    public void onClose(Session peer) {
        peers.remove(peer);
    }

    /**
     *
     * @param message the payload of the message
     * @param client defines the ither end of the websocket connection.
     * @throws IOException
     * @throws EncodeException
     */
    @OnMessage
    public void message(String message, Session client) throws IOException, EncodeException {
        for (Session peer : peers) {
            peer.getBasicRemote().sendObject(message);
        }
    }
}
