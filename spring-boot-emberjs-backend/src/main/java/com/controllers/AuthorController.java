package com.controllers;

import com.models.Author;
import com.services.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Roman Nagibov
 */
@RestController
@RequestMapping(value = "/authors")
public class AuthorController {

    @Autowired
    private AuthorService authorService;


    @RequestMapping
    public List<Author> getAll() {
        return authorService.getAll();
    }

    @RequestMapping(value = "/{id}")
    public Author get(@PathVariable Long id) {
        return authorService.get(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public Author save(@RequestBody Author author) {
        return authorService.save(author);
    }


    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable Long id) {
        authorService.delete(id);
    }

}
