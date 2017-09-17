package com.models;

import lombok.Data;

import javax.persistence.*;
import java.sql.Date;

/**
 * @author Roman Nagibov
 */
@Data

@Entity
@Table(name = "posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "date")
    private Date date;
    
    @Column(name = "body")
    private String body;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private Author author_id;
}
