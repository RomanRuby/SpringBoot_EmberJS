package com.repository;

import com.models.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Roman Nagibov
 */
@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {

}
