CREATE TABLE Users(
id        serial       NOT NULL,
firstName VARCHAR(20)  NOT NULL,
lastName  VARCHAR(20)  NOT NULL,
email     VARCHAR(50)  NOT NULL,
password  VARCHAR(20)  NOT NULL,
about     VARCHAR(300) NOT NULL,
imageURL  text         NOT NULL,
DOB       date         NOT NULL,
likes     integer      NOT NULL DEFAULT 0,
country   VARCHAR(50) NOT NULL,
PRIMARY KEY(id)
);

CREATE TABLE Discussion(
id           serial       NOT NULL,
userId       integer      NOT NULL,
title        VARCHAR(50)  NOT NULL,
body         VARCHAR(300) NOT NULL,
topic        text         NOT NULL,
datePosted   timestamptz    NOT NULL DEFAULT NOW(),
PRIMARY KEY(id),
CONSTRAINT discussion_user_fk FOREIGN KEY (userId)
      REFERENCES Users (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE DiscussionReply(
id               serial       NOT NULL,
userId           integer      NOT NULL,
discussionId     integer      NOT NULL,
body             VARCHAR(300) NOT NULL,
datePosted       timestamptz    NOT NULL DEFAULT NOW(),
PRIMARY KEY(id),
CONSTRAINT discussionreply_user_fk FOREIGN KEY (userId)
      REFERENCES Users (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
CONSTRAINT discussionreply_discussion_fk FOREIGN KEY (discussionId)
      REFERENCES Discussion (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE Message(
id               serial       NOT NULL,
senderId         integer      NOT NULL,
recieverId       integer      NOT NULL,
Subject          VARCHAR(50)  NOT NULL,
dateSent         timestamptz    NOT NULL DEFAULT NOW(),
PRIMARY KEY(id),
CONSTRAINT message_user_send_fk FOREIGN KEY (senderId)
      REFERENCES Users (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
CONSTRAINT message_recieve_user_fk FOREIGN KEY (recieverId)
      REFERENCES Users (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE MessageReply(
id               serial       NOT NULL,
messageId        integer      NOT NULL,
senderId         integer      NOT NULL,
recieverId       integer      NOT NULL,
body             VARCHAR(200) NOT NULL,
dateSent         timestamptz    NOT NULL DEFAULT NOW(),
PRIMARY KEY(id),
CONSTRAINT messagereply_message_fk FOREIGN KEY (messageId)
      REFERENCES Message (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
CONSTRAINT messagereply_user_send_fk FOREIGN KEY (senderId)
      REFERENCES Users (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
CONSTRAINT messagereply_recieve_user_fk FOREIGN KEY (recieverId)
      REFERENCES Users (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);

