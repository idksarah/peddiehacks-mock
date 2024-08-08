package com.booktalk.booktalk_app.Services;

import org.springframework.stereotype.Service;

import com.booktalk.booktalk_app.Repositories.BookRepository;
import com.booktalk.booktalk_app.Repositories.ChapterRepository;
import com.booktalk.booktalk_app.Repositories.UserBookRepository;
import com.booktalk.booktalk_app.Repositories.UserRepository;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Service
public class GeneralPurposeService {
    private BookRepository books;
    private ChapterRepository chapters;
    private UserRepository users;
    private UserBookRepository connections;

    public boolean deleteUserById(Long id){
        if(!users.existsById(id)){
            return false;
        }
        connections.deleteAllByUser_UserId(id);
        users.deleteById(id);
        return true;
    }
}
