import React, { useEffect, useState } from "react";
import axios from "axios";
import Title from "./Title";

import { StarIcon } from "@heroicons/react/outline";

export default function Trending() {
  const [repos, setRepos] = useState();
  const [filteredData, setFilteredData] = useState(repos);

  useEffect(() => {
    axios
      .get(
        `https://api.github.com/search/repositories?sort=desc&order=stars&q=created:2021-06-01`
      )
      .then((res) => {
        const d = res.data;
        setRepos(d.items);
        setFilteredData(d.items);
      });
  }, []);

  const handleSortByName = () => {
    const sorted = filteredData.slice().sort(function (a, b) {
      var keyA = a.name,
        keyB = b.name;
      // Compare the 2 dates
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });

    setFilteredData(sorted);
  };

  const handleSortByOwner = () => {
    const sorted = filteredData.slice().sort(function (a, b) {
      var keyA = a.owner.login,
        keyB = b.owner.login;
      // Compare the 2 dates
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });

    setFilteredData(sorted);
  };

  const handleSortByStars = () => {
    const sorted = filteredData.slice().sort(function (a, b) {
      return b.stargazers_count - a.stargazers_count;
    });

    setFilteredData(sorted);
  };

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    result = repos.filter((data) => {
      return data.full_name.toLowerCase().search(value) !== -1;
    });
    setFilteredData(result);
  };

  return (
    <>
      <Title />

      <div className="flex flex-wrap mx-auto max-w-7xl">
        {/* Filtering and sorting */}
        <div className="top-0 w-full h-full px-2 pb-2 md:sticky md:w-1/3">
          <div className="flex items-center my-4 space-x-2">
            <p className="text-sm text-gray-400">Sort by:</p>
            <span className="relative z-0 inline-flex shadow-sm rounded-md">
              <button
                type="button"
                className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                onClick={handleSortByStars}
              >
                Stars
              </button>
              <button
                type="button"
                className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                onClick={handleSortByName}
              >
                Name
              </button>
              <button
                type="button"
                className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                onClick={handleSortByOwner}
              >
                Owner
              </button>
            </span>
          </div>

          <div className="w-3/4">
            <label htmlFor="email" className="block text-sm text-gray-400">
              Search
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="email"
                id="email"
                className="block w-full border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                placeholder="Search for ..."
                onChange={(e) => handleSearch(e)}
              />
            </div>
          </div>
        </div>

        {/* Main repos table */}
        <div className="w-full max-w-4xl mx-auto my-6 overflow-hidden bg-white shadow md:w-2/3 sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredData
              ? filteredData.map((repo) => (
                  <li key={repo.id}>
                    <div className="block hover:bg-gray-50">
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg
                              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                              viewBox="0 0 16 16"
                              version="1.1"
                              data-view-component="true"
                              height="16"
                              width="16"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"
                              ></path>
                            </svg>
                            <a
                              href={repo.html_url}
                              className="text-sm font-medium text-indigo-600 truncate"
                            >
                              <span>{repo.owner.login}</span>
                              <span> / </span>
                              <span className="font-bold">{repo.name}</span>
                            </a>
                          </div>
                          <div className="flex flex-shrink-0 ml-2">
                            <p className="inline-flex px-2 py-1 text-xs font-semibold text-gray-800 border cursor-pointer bg-gray-50 hover:bg-gray-200 rounded-md ">
                              <StarIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                              Star
                            </p>
                          </div>
                        </div>

                        <p className="text-sm text-gray-500">
                          {repo.description}
                        </p>
                        <div className="mt-2 sm:flex sm:justify-between ">
                          <div className="items-center sm:flex">
                            {repo.language && (
                              <p className="mr-4 text-xs text-gray-500">
                                {repo.language}
                              </p>
                            )}
                            <p className="flex items-center mr-2 text-xs text-gray-500">
                              <svg
                                aria-label="fork"
                                role="img"
                                viewBox="0 0 16 16"
                                version="1.1"
                                data-view-component="true"
                                height="16"
                                width="16"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                ></path>
                              </svg>
                              {repo.forks_count}
                            </p>
                            <p className="flex items-center mt-2 text-xs text-gray-500 sm:mt-0 sm:ml-6">
                              Built by{" "}
                              <img
                                src={repo.owner.avatar_url}
                                alt=""
                                className="w-4 h-4 ml-2 rounded-full"
                              />
                            </p>
                          </div>
                          <div className="flex items-center mt-2 text-xs text-gray-500 sm:mt-0">
                            <StarIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                            <p>{repo.stargazers_count} stars</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              : "Loading ..."}
          </ul>
        </div>
      </div>
    </>
  );
}
