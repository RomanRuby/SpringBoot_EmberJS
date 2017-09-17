package com.repository;

import com.models.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Roman Nagibov
 */
@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
}
