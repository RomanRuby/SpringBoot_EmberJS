package com.services;

import com.models.Post;
import com.sun.istack.internal.Nullable;

import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * @author Roman Nagibov
 */
public interface PostService {

    @Nullable
    List<Post> getAll();

    @Nullable Post get(@NotNull Long id);

    @Nullable Post save(@NotNull Post post);

    void delete(@NotNull Long id);

}
