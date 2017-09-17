package com.models;

import lombok.Data;

import javax.persistence.*;

/**
 * @author Roman Nagibov
 */
@Data

@Entity
@Table(name = "authors")
public class Author {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;
}
