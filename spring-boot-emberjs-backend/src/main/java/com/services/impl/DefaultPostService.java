package com.services.impl;

import com.models.Post;
import com.repository.PostRepository;
import com.services.PostService;
import com.sun.istack.internal.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author Roman Nagibov
 */
@Service
@Transactional(readOnly = true)
public class DefaultPostService implements PostService {

    @Autowired
    private PostRepository postRepository;

    @Nullable
    @Override
    public List<Post> getAll() {
        return postRepository.findAll();
    }

    @Nullable
    @Override
    public Post get(Long id) {
        return postRepository.getOne(id);
    }

    @Transactional
    @Nullable
    @Override
    public Post save(Post post) {
        return postRepository.save(post);
    }

    @Transactional
    @Override
    public void delete(Long id) {
postRepository.delete(id);
    }
}
