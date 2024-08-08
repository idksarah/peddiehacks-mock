package com.booktalk.booktalk_app.Repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.booktalk.booktalk_app.Entities.User;
import com.booktalk.booktalk_app.Entities.UserBook;

@Repository
public interface UserBookRepository extends JpaRepository<UserBook, Long> {
    void deleteAllByUser_UserId(Long id);
    void deleteAllByUser_Email(String email);
}
