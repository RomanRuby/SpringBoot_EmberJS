package com.services.impl;

import com.models.Author;
import com.repository.AuthorRepository;
import com.services.AuthorService;
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
public class DefaultAuthorService implements AuthorService {

    @Autowired
    private AuthorRepository authorService;


    @Nullable
    @Override
    public List<Author> getAll() {
        return authorService.findAll();
    }

    @Nullable
    @Override
    public Author get(Long id) {
        return authorService.getOne(id);
    }

    @Transactional
    @Nullable
    @Override
    public Author save(Author author) {
        return authorService.save(author);
    }

    @Transactional
    @Override
    public void delete(Long id) {
authorService.delete(id);
    }
}
