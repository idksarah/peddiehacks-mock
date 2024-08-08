package com.booktalk.booktalk_app.Repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.booktalk.booktalk_app.Entities.Chapter;
import com.booktalk.booktalk_app.Entities.User;

@Repository
public interface ChapterRepository extends JpaRepository<Chapter, Long> {
}
