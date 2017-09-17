package com.controllers;

import com.models.Post;
import com.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * @author Roman Nagibov
 */

@RestController
@RequestMapping(value = "/posts")
public class PostController {

    @Autowired
    private PostService postService;


    @RequestMapping
    public List<Post> getAll() {
        return postService.getAll();
    }

    @RequestMapping(value = "/{id}")
    public Post get(@PathVariable Long id) {
        return postService.get(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public Post save(@RequestBody @Valid Post post) {
        return postService.save(post);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable Long id) {
        postService.delete(id);
    }
}
