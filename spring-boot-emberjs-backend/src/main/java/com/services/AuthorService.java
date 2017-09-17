package com.services;

import com.models.Author;
import com.sun.istack.internal.Nullable;

import javax.validation.constraints.NotNull;
import java.util.List;


/**
 * @author Roman Nagibov
 */
public interface AuthorService {
    @Nullable
    List<Author> getAll();

    @Nullable
    Author get(@NotNull Long id);

    @Nullable Author save(@NotNull Author author);

    void delete(@NotNull Long id);
}
